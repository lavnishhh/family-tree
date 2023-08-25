import React, { useState, useRef, useEffect } from 'react'
import { Node } from './node'

export function Tree({ node, navHeight, connector, selectPerson, getConnectorLengthFromParent }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [connectorLength, setConnectorLength] = useState('0.25rem');
    const [person, setPerson] = useState(selectPerson)

    const childrenRef = useRef(null)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    function getConnectorLength() {
        console.log(childrenRef.current)
        if (childrenRef.current.children.length > 1) {
            const children = childrenRef.current.children
            const distance = children[node.children.length - 1].querySelector('.connector-top').getBoundingClientRect().left - children[0].querySelector('.connector-top').getBoundingClientRect().left
            return distance
        }
    }

    useEffect(() => {
        if (connector) {
            setConnectorLength(getConnectorLengthFromParent())
        }
    }, [])

    if (node.children == []) {
        return
    }

    return (
        <div className={`flex ${isExpanded ? 'flex-col items-center tree' : 'hidden'}`}>
            <div className="flex flex-col justify-center items-center node mx-3 relative">
                {
                    connector ?
                        <div
                            className="bg-blue-400 h-1 connection-line absolute bottom-full" style={{ width: connectorLength + 4, left: 'calc(50% - 2px)' }}>
                        </div>
                        :
                        null
                }
                <div
                    className="bg-blue-400 w-1 h-5 connector-top">
                </div>
                <Node name={node.name}></Node>
                <div
                    className="bg-red-400 w-5 h-5 rounded-2xl -m-2 z-10">
                    {/* {onClick={toggleExpand}} */}
                </div>
                <div
                    className="bg-blue-400 w-1 h-5">
                </div>
            </div>
            <div className="connections flex flex-row" ref={childrenRef}>
                {
                    node.children.map((child, index) => {
                        return (
                            index == 0 ? <Tree node={child} key={child.id} navHeight={navHeight} connector={true} person={person} getConnectorLengthFromParent={getConnectorLength}></Tree> : <Tree node={child} key={child.id} navHeight={navHeight}></Tree>
                        )
                    })
                }
            </div>
        </div>
    )
}