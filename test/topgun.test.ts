import { boolean, nullable, number, object, optional, record, string, union } from '../src/structs';
import { err, Infer, isErr, isObject, isOk, map, ok, Shape, Struct, StructError } from '../src';
import { expectOk } from './test-util';

const TopGunData = {
    'user': {
        '_'    : {
            '#': 'user',
            '>': {
                'name' : 1682701808609,
                'email': 1682701808609,
                'said' : 1682701831454
            }
        },
        'name' : 'Mark',
        'email': 'mark@minigun.tech',
        'said' : { '#': 'user/said' }
    }
};

const nodeState = object({
    '_': object({
        '#': string(),
        '>': object({})
    })
});

const soulPresentInGraph = (graph, msg = 'Soul not present in graph'): Struct<any> =>
    (input) =>
    {
        const soul = input && input._ && input._['#'];

        if (!isObject(graph[soul]))
        {
            return err(new StructError(msg, { input, path: [] }));
        }

        return ok(input);
    };

const nodeValueType: Struct<any> =
          (input) =>
          {
              // Node values must any of: null, string, number, boolean, object with '#' reference
              const numberStruct  = record(string(), nullable(number()));
              const stringStruct  = record(string(), nullable(string()));
              const booleanStruct = record(string(), nullable(boolean()));
              const objectStruct  = record(string(), object({ '#': string() }));

              const nodeStruct = union([
                  numberStruct,
                  stringStruct,
                  booleanStruct,
                  objectStruct
              ]);

              return nodeStruct(input);
          };

const attributeLastChangeTimestamp: Struct<any> =
          (node) =>
          {
              const shape: Shape = {};

              for (const attribute in node)
              {
                  if (attribute !== '_')
                  {
                      shape[attribute] = number();
                  }
              }

              const state  = node._['>'];
              const struct = object(shape);
              return struct(state);
          };

const graphValidator: Struct<any> =
          (graph) =>
          {
              if (!isObject(graph))
              {
                  return err(new StructError(`Expecting object`, { input: graph, path: [] }));
              }

              const nodeStruct        = union([
                  nodeState,
                  soulPresentInGraph(graph),
                  nodeValueType,
                  attributeLastChangeTimestamp
              ]);
              const graphShape: Shape = {};

              for (const soul in graph)
              {
                  graphShape[soul] = nodeStruct;
              }

              const struct = object(graphShape);

              return struct(graph);
          };

// const node = (graph) => map(soulState, input =>
// {
//     // Here `node` is guaranteed have metadata in '_' node property.
//
//     // const soul = input && input._ && input._['#'];
//     // if (!isObject(graph[soul]))
//     // {
//     //     return err(new StructError(`Soul not present in graph`, { input, path: [] }));
//     // }
//
//     // const soulStruct = object({
//     //     [soul]: object({})
//     // });
//     // const soulResult = soulStruct(graph);
//     //
//     // if (isErr(soulResult))
//     // {
//     //     return soulResult;
//     // }
//
//     // const soulStruct = validateGraphContainSoul(graph);
//     // const soulResult = soulStruct(input);
//     //
//     // if (isErr(soulResult))
//     // {
//     //     return soulResult;
//     // }
//
//     // Parent graph must contain soul
//     const soulStruct = soulPresentInGraph(graph);
//
//     // Node values must any of: null, string, number, boolean, object with '#' reference
//     const numberStruct  = record(string(), nullable(number()));
//     const stringStruct  = record(string(), nullable(string()));
//     const booleanStruct = record(string(), nullable(boolean()));
//     const objectStruct  = record(string(), object({ '#': string() }));
//
//     const nodeStruct = union([
//         soulStruct,
//         numberStruct,
//         stringStruct,
//         booleanStruct,
//         objectStruct
//     ]);
//
//     const nodeResult = nodeStruct(input);
//
//     if (isErr(nodeResult))
//     {
//         return nodeResult;
//     }
//
//     const metaShape: Shape = Object.keys(input).reduce((accum, key) =>
//     {
//         if (key !== '_')
//         {
//             accum[key] = number();
//         }
//
//         return accum;
//     }, {});
//     const metaStruct       = object(metaShape);
//     const metaResult       = metaStruct(input._['>']);
//
//
//     return metaResult;
// });

// const graph = map(object({}), input =>
// {
//     const graphShape: Shape = {};
//
//     for (const key in input)
//     {
//         graphShape[key] = node(input);
//     }
//
//     // const graphShape  = Object.keys(input).reduce((accum, key) =>
//     // {
//     //     accum[key] = node(input)(input[key]);
//     //     return accum;
//     // }, {});
//     const graphResult = object(graphShape);
// });

/*const node = (): Struct<any> =>
{
    return (input) =>
    {
        if (!isObject(input)) return err(new StructError(`Expecting object`, { input, path: [] }));
        if (!isObject(input['_'])) return err(new StructError(`Expecting object`, { input, path: [] }));


        const obj = Object.create(null);
        for (const [key, struct] of entries)
        {
            const result = struct(input[key]);
            if (isErr(result))
            {
                result.error.info.path.unshift(key);
                return result;
            }
            obj[key] = result.value;
        }
        return ok(obj);
    };
};*/

// const struct = object(
//     {},
//     'test',
// );
// const nodeTimeStateStruct = record(string(), number('Expected time in milliseconds'), 'Expected node state');
// const nodeMetaStruct  = object({
//     '#': string('soul'),
//     '>': nodeTimeStateStruct
// });
// const nodeStruct   = object({
//     '_': nodeMetaStruct
// });

// const getNodeStruct =

// const structNodeMeta =  record(string(), structNodeState, 'Expected node meta state');
// const structNode      = record(string(), structNodeMeta, 'test');
// const structGraphData = record(string(), nodeStruct, 'test');

describe('TopGun', () =>
{
    it('base', () =>
    {
        const actual = graphValidator(TopGunData);
        console.log(JSON.stringify(actual));
        expect(actual.ok).toBeTruthy();
    });
});
