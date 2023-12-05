import React from 'react';

const List = (props) => {
    return (
        <div className='stateList'>
            <table role="presentation">
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td><a>Alabama</a></td>
                        <td>Alaska</td>
                        <td>Arizona</td>
                        <td>Arkansas</td>
                        <td>California</td>
                    </tr>

                    {/* row 2 */}
                    <tr>
                        <td>Colorado</td>
                        <td>Connecticut</td>
                        <td>Delaware</td>
                        <td>Florida</td>
                        <td>Georgia</td>
                    </tr>

                    {/* row 3 */}
                    <tr>
                        <td>Hawaii</td>
                    </tr>

                    {/* row 4 */}
                    <tr>
                        
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default List;