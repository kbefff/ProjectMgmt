import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        update: (cache, { data: { deleteClient } }) => {
            const { clients } = cache.readQuery({ query: GET_CLIENTS }); // get the current clients from the cache
            cache.writeQuery({ //set clients in cache to all clients except the one we just deleted
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id) }
            })
        },
        // refetchQueries: [{ query: GET_CLIENTS }],  // possible alternative to update - if you do this too much, it can slow down your app
        onError: (error) => {
            console.error("Mutation error:", error);
        },
    })

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btrn-sm' onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}