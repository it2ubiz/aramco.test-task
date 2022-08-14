import React from 'react'
import { array } from 'prop-types';

const Contacts = ({ contacts }) => {
    let cnt;
    if (contacts.length !== 0){
        cnt=contacts;
        return (
            <table border="1">
                <thead>
                    <tr><th>CRIM</th><th>ZN</th>
                    <th>INDUS</th><th>CHAS</th><th>NOX</th>
                    <th>RM</th><th>AGE</th><th>DIS</th>
                    <th>RAD</th><th>TAX</th><th>PTRATIO</th><th>B</th><th>LSTAT</th>
                    <th>TARGET</th><th>PREDICT</th></tr>
                </thead>
                <tbody>
                    {cnt.map((ct,ind) => (
                        <tr key={ind}>
                        {ct.map((x,index) => (
                            <td key={(ind+1)*(index+1)}>{x}</td>
                        ))}  
                        </tr>           
                    ))}
                </tbody>
            </table>
        )
    }
    return(
        <table border="1">
            <thead>
                <tr><th>CRIM</th><th>ZN</th>
                <th>INDUS</th><th>CHAS</th><th>NOX</th>
                <th>RM</th><th>AGE</th><th>DIS</th>
                <th>RAD</th><th>TAX</th><th>PTRATIO</th><th>B</th><th>LSTAT</th></tr>
            </thead>
            <tbody></tbody>
        </table>
    )       
};

export default Contacts