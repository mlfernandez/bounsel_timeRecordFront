import React from 'react';
import './DataContainer.scss';
import { connect } from 'react-redux';
import ViewProfile from '../../components/ViewProfile/ViewProfile';



const DataContainer = (props) => {

    const changeView = () => {
        switch (props.views) {


            case 'getprofile':

                return <ViewProfile/>              
                             
            case 'getuser':

                return  
    
    
            default:

                return 
        }

    }

    return (
        <div>

            <div>
            
                <div className="datos">
                    {changeView()}
                </div>
            </div>


        </div>
    )

}

export default connect((state) => ({
    user: state.credentials.user,
    views: state.views
}))(DataContainer);