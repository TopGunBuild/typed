import { generateMessageId, pseudoRandomText } from './test-util';
import { object } from '../src/structs';

const msgId = pseudoRandomText();

const ErrorMessage = {
    '#': msgId,
    '@': generateMessageId(),
    err: 'Error fetching node'
};

const PutMessage = {
    '#'  : 'pggq2hy3bto',
    'put': {
        'user': {
            '_'      : {
                '#': 'user',
                '>': { 'name': 1682701808609, 'email': 1682701808609, 'said': 1682701831454 }
            },
            'name': 'Mark',
            'email': 'mark@minigun.tech',
            'said': { '#': 'user/said' }
        }
    }
};

// const GetMessage = {
//     '#'  : msgId,
//     'get': {
//         '#': msgId,
//     }
// };

const validator = object({

});