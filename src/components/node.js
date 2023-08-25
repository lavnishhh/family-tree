import React, { useState } from 'react'

export function Node({ name }) {
    return (
        <div
            className="relative block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span className="text-xl block">{name.en}/{name.hi}</span>
        </div>
    )
}