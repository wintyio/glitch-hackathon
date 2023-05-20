import styled from "styled-components";
import { Card } from "./Card";

import * as React from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";


import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'
import { ReactFlow, useEdgesState, useNodesState } from "reactflow";
import { useSelector } from "react-redux";
import { selectMap } from "../slices/gameInfo";

function TouchScrollView(props) {
    const ref = React.useRef();
    const isDragging = React.useRef(false);
    const [{ x }, setX, stopX] = useSpring(() => ({ x: 0 }));
    const [{ y }, setY, stopY] = useSpring(() => ({ y: 0 }));
    const bind = useGesture(
        {
            onDrag({ down, movement: [x, y], first, last, vxvy: [vx] }) {
                console.log("onDrag with movement", { x, y, first, last, vx, down });
                if (first) isDragging.current = true;
                if (last) setTimeout(() => (isDragging.current = false), 0);

                setX({ x: -x, immediate: down });
                setY({ y: -y, immediate: down });

                console.log(x, y)
            },
            onClickCapture(ev) {
                if (isDragging.current) {
                    // ev.stopPropagation();
                }
            },
            onWheelStart() {
                // Stop any user-land scroll animation from confcliting with the browser
                try {
                    // stopY();
                    // stopX();
                } catch { }
            }
        },
        {
            drag: {
                filterTaps: true,
                initial() {
                    console.log("Initial x value", -ref.current.scrollLeft);
                    return [-ref.current.scrollLeft, -ref.current.scrollTop];
                }
            },
        }
    );

    return (
        <animated.div
            id="card-board"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(var(--vh, 1vh) * 100)", padding: 30, overflow: "scroll" }}
            ref={ref}
            scrollLeft={x}
            scrollTop={y}
            className={props.className + " remove-scrllbar"}
            {...bind()}
        >
            {props.children}
        </animated.div >
    );
}

function VerticalScrollView(props) {
    const ref = React.useRef();
    const isDragging = React.useRef(false);
    const [{ y }, set, stop] = useSpring(() => ({ y: 0 }));
    const bind = useGesture(
        {
            onDrag({ down, movement: [, y], first, last }) {
                if (first) isDragging.current = true;
                if (last) setTimeout(() => (isDragging.current = false), 0);
                set({ y: -y, immediate: down });
            },
            onClickCapture(ev) {
                if (isDragging.current) {
                    ev.stopPropagation();
                }
            },
            onWheelStart() {
                // Stop any user-land scroll animation from confcliting with the browser
                stop();
            }
        },
        {
            drag: {
                axis: "y",
                filterTaps: true,
                initial() {
                    return [0, -ref.current.scrollTop];
                }
            }
        }
    );

    return (
        <animated.div
            ref={ref}
            scrollTop={y}
            className={props.className}
            {...bind()}
        >
            {props.children}
        </animated.div>
    );
}

var defaultViewport = { x: 0, y: 0, zoom: 0.4 };

const nodeTypes = {
    card: Card,
};

export function CardBoard(props) {
    // const [nodes, setNodes, onNodesChange] = useNodesState([]);

    // setNodes([
    //     {
    //         id: '1',
    //         type: 'card',
    //         data: { label: 'An input node' },
    //         position: { x: 0, y: 50 },
    //         sourcePosition: 'right',
    //     },
    //     {
    //         id: '2',
    //         type: 'card',
    //         style: { border: '1px solid #777', padding: 10 },
    //         position: { x: 300, y: 50 },
    //     },
    //     {
    //         id: '3',
    //         type: 'card',
    //         data: { label: 'Output A' },
    //         position: { x: 650, y: 25 },
    //         targetPosition: 'left',
    //     },
    //     {
    //         id: '4',
    //         type: 'card',
    //         data: { label: 'Output B' },
    //         position: { x: 650, y: 100 },
    //         targetPosition: 'left',
    //     },
    // ]);

    return <div style={{ position: "absolute", width: "100vw", height: "calc(100vh + 30px)", top: -30 }}>
        <CustomNodeFlow />
        {/* <ReactFlow nodeTypes={nodeTypes} nodes={nodes} fitView>
            {[...Array(props.row)].map(x => <Row>

                {[...Array(props.col)].map(y => <Card key={x * 10 + y} />)}

            </Row>)}
        </ReactFlow> */}
    </div>;
}

const CustomNodeFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const map = useSelector(selectMap);

    useEffect(() => {
        const _nodes = [];

        const ROW = 5;
        const COL = 10;

        [...Array(ROW).keys()].map(r => {
            [...Array(COL).keys()].map(c => {
                _nodes.push({
                    id: `${c * 10 + r}`,
                    type: 'card',
                    data: { c: c, r: r, imgIdx: 0 },
                    position: { x: c * 140, y: r * 160 },
                    sourcePosition: 'left',
                })
            })
        })

        setNodes(_nodes);
        // setNodes([
        //     {
        //         id: '1',
        //         type: 'input',
        //         data: { label: 'An input node' },
        //         position: { c: 0, y: 50 },
        //         sourcePosition: 'right',
        //     },
        //     {
        //         id: '2',
        //         type: 'card',
        //         style: { border: '1px solid #777', padding: 10 },
        //         position: { x: 300, y: 50 },
        //     },
        //     {
        //         id: '3',
        //         type: 'output',
        //         data: { label: 'Output A' },
        //         position: { x: 650, y: 25 },
        //         targetPosition: 'left',
        //     },
        //     {
        //         id: '4',
        //         type: 'output',
        //         data: { label: 'Output B' },
        //         position: { x: 650, y: 100 },
        //         targetPosition: 'left',
        //     },
        // ]);

    }, []);

    // nodes.map(n => {
    //     n.id === 
    // })

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                node.data = {
                    ...node.data,
                    flip: map[node.data.r][node.data.c] !== 0,
                    imgIdx: map[node.data.r][node.data.c]
                };

                return node;
            })
        );
    }, [map]);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            defaultViewport={defaultViewport}
            // elementsSelectable
            zoomOnScroll
            // panOnScroll
            // panOnScrollMode="free"
            // panOnDrag
            zoomOnDoubleClick={false}
        // fitView
        >

        </ReactFlow>
    );
};