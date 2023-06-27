import React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export default function AddTask({ tasks, handleDeleteTask }) {
    return (
        <>
            <Grid container style={{ marginLeft: '20px' }}>
                {tasks.length > 0 ? (
                    tasks.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                borderLeft: item.reminder ? '4px solid green' : '4px solid red',
                                paddingLeft: item.reminder ? '10px' : '10px',
                                background: '#e4e4e6',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '430px',
                                marginLeft: '10px'
                            }}
                        >
                            <div>
                                <a style={{ fontSize: '19px' }}>{item.task}</a>
                                <br />
                                <a style={{ top: '0px' }}>{item.addDayDate}</a>
                            </div>
                            <button
                                onClick={() => handleDeleteTask(item.id)}
                                style={{ color: 'red', border: 'none', background: 'none', fontSize: '20px' }}
                            >
                                x
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '10px' }}>No Task To Show</div>
                )}
            </Grid>

            <div>MiniProject API & Asynchronous © 2023</div>

            <Grid item xs>
                <Link href="/about" variant="body2" style={{ textAlign: 'center' }}>
                    About
                </Link>
            </Grid>
        </>
    );
}
