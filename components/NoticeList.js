import React from 'react'
import PropTypes from 'prop-types';

const NoticeList =({data}) =>{

return(
    <div>
        {data.notIdx}
    </div>
)
}

NoticeList.propTypes ={
    data: PropTypes.object.isRequired
}
export default NoticeList;
