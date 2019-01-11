const { get } = require('lodash')
const pluralize = require('pluralize')
const resources = require('./resources')
const resolvers = require('./')

const mockValues = {
  getAll: [ { id: 'result1'}, { id: 'result2' }],
  getOne: { id: 'result'},
  getCount: 100
}

const mockContext = {
  service: { id: '<service-id>' },
  dataSources: {
    clipsAPI: {
      getAll: jest.fn(() => mockValues.getAll).mockName('ClipsAPI.getAll'),
      getCount: jest.fn(() => mockValues.getCount).mockName('ClipsAPI.getCount'),
      getOne: jest.fn(() => mockValues.getOne).mockName('ClipsAPI.getOne'),
    }
  }
};

const { getAll, getCount, getOne } = mockContext.dataSources.clipsAPI;

describe.each(Object.entries(resources))(
  '%s (%s)', (typeName, restName) => {
    const resolversSpecs = [
      ['single object', {
        path: `Query.${typeName.toLowerCase()}`,
        args: { where: { id: '<single-object-id>' } },
        mockFn: getOne,
        mockFnArgs: [restName, '<single-object-id>'],
        expectedResult: mockValues.getOne
      }],
      ['object list', {
        path: `Query.${pluralize(typeName.toLowerCase())}`,
        args: { listArg: 'value' },
        mockFn: getAll,
        mockFnArgs: [restName, { listArg: 'value' }],
        expectedResult: mockValues.getAll
      }],
      ['Relay connection', {
        path: `Query.${pluralize(typeName.toLowerCase())}Connection`,
        args: { connectionArg: 'value' },
        mockFn: getCount,
        mockFnArgs: [restName, { connectionArg: 'value' }],
        expectedResult: { aggregate: { count: mockValues.getCount } }
      }],
      ['type', {
        path: typeName
      }]
    ];

    describe.each(resolversSpecs)(
      `%s`, (name, specs) => {
        const resolver = get(resolvers, specs.path);

        // test type resolver
        if (name === 'type') {
          it('is an object', () => {
            expect(resolver).toBeInstanceOf(Object);
          });
        }

        // test query resolver function
        else {
          it('is a function resolver', () => {
            expect(resolver).toBeInstanceOf(Function);
          });
          it(`calls datasource method`, async () => {
            const res = await resolver(null, specs.args, mockContext);
            expect(specs.mockFn).toBeCalledWith(...specs.mockFnArgs);
            expect(res).toEqual(specs.expectedResult)
          });
        }
      }
    );
  }
);
