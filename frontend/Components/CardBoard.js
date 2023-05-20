import styled from "styled-components";
import { Card } from "./Card";

import * as React from "react";
// import "./styles.css";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";


import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'


// const useGesture = createUseGesture([dragAction, pinchAction])

// function TouchScrollView(props) {
//     useEffect(() => {
//         const handler = (e) => e.preventDefault()
//         document.addEventListener('gesturestart', handler)
//         document.addEventListener('gesturechange', handler)
//         document.addEventListener('gestureend', handler)
//         return () => {
//             document.removeEventListener('gesturestart', handler)
//             document.removeEventListener('gesturechange', handler)
//             document.removeEventListener('gestureend', handler)
//         }
//     }, [])

//     const [style, api] = useSpring(() => ({
//         x: 0,
//         y: 0,
//         scale: 1,
//         rotateZ: 0,
//     }))
//     const ref = React.useRef < HTMLDivElement > (null)

//     useGesture(
//         {
//             // onHover: ({ active, event }) => console.log('hover', event, active),
//             // onMove: ({ event }) => console.log('move', event),
//             onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
//                 if (pinching) return cancel()
//                 api.start({ x, y })
//             },
//             onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
//                 if (first && ref.current.hasOwnProperty("getBoundingClientRect")) {
//                     const { width, height, x, y } = ref.current.getBoundingClientRect()
//                     const tx = ox - (x + width / 2)
//                     const ty = oy - (y + height / 2)
//                     memo = [style.x.get(), style.y.get(), tx, ty]
//                 }

//                 const x = memo[0] - (ms - 1) * memo[2]
//                 const y = memo[1] - (ms - 1) * memo[3]
//                 api.start({ scale: s, rotateZ: a, x, y })
//                 return memo
//             },
//         },
//         {
//             target: ref,
//             drag: { from: () => [style.x.get(), style.y.get()] },
//             pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
//         }
//     )

//     return (
//         <div className={`flex fill center`}>
//             <animated.div ref={ref} >{props.children}</animated.div>
//         </div>
//     )
// }


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
            style={{ height: "calc(var(--vh, 1vh) * 100)", padding: 30, overflow: "scroll" }}
            ref={ref}
            scrollLeft={x}
            scrollTop={y}
            className={props.className + " remove-scrollbar"}
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



const Row = styled.div`
    display: flex;
`;

export function CardBoard(props) {

    return <div style={{ position: "absolute", width: "100vw" }}>
        <TouchScrollView>
            {[...Array(props.row)].map(x => <Row>

                {[...Array(props.col)].map(y => <Card />)}

            </Row>)}
        </TouchScrollView>
    </div>;
}