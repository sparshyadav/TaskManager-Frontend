import React from 'react';
import moment from 'moment';

function TaskListTable({ tabledata = [] }) {
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending':
                return 'bg-purple-100 text-purple-500 border border-purple-200';
            case 'In Progress':
                return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200'; // typo fixed here
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-500 border border-red-200';
            case 'Medium':
                return 'bg-orange-100 text-orange-500 border border-orange-200';
            case 'Low':
                return 'bg-green-100 text-green-500 border border-green-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200'; // typo fixed here
        }
    };
  
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>Name</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>Status</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>Priority</th>
                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>Created On</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {tabledata.map((task) => (
                        <tr key={task._id}>
                            <td className='px-4 py-2 text-sm text-gray-700'>{task.title}</td>
                            <td className='px-4 py-2'>
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className='px-4 py-2'>
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className='px-4 py-2 text-sm text-gray-600'>
                                {task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskListTable;
