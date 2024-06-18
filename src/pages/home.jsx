import React from "react";
import { Button, TextInput, Title, ActionIcon } from '@mantine/core';
import { db } from '../db'
import { useLiveQuery } from "dexie-react-hooks";
import { useRef } from "react";
import { IconCircleX } from '@tabler/icons-react';

export default function Home() {
    const mTemplateList = useLiveQuery(() => db.templates.toArray())
    const inputRef = useRef({})

    function doSearch(item) {
        const url = new URL("https://www.google.com/search")
        const query = `${inputRef.current[item.id].value} site:${item.site}`
        url.searchParams.append('q', query)
        window.location.href = url.toString()
    }

    return (
        <div className="flex flex-col space-y-4 h-full px-4">
            <Title order={1}>Google search templates</Title>
            {mTemplateList ? mTemplateList.map(item =>
                <div key={item.id} className="flex items-center h-full space-x-4">
                    <ActionIcon color="red" variant="filled" aria-label="Settings" size="input-sm" onClick={async () => {
                        await db.templates.delete(item.id)
                    }}>
                        <IconCircleX />
                    </ActionIcon>

                    <TextInput className="flex-grow" placeholder="search" ref={el => inputRef.current[item.id] = el} onKeyUp={
                        event => {
                            if (event.code === 'Enter') {
                                event.preventDefault()
                                doSearch(item)
                            }
                        }
                    } />

                    <TextInput placeholder="site" value={item.site} onChange={async (event) => {
                        const inputStr = event.currentTarget.value
                        await db.templates.update(item.id, { site: inputStr })
                    }} />

                    <Button onClick={() => {
                        doSearch(item)
                    }}>Go</Button>
                </div>
            ) : <span>empty</span>}
            <Button
                onClick={async () => {
                    await db.templates.add({ site: 'reddit.com' })
                }}
            >Add</Button>
        </div>
    )
}