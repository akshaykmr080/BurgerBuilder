import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null

        }
        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnMount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedhandler = () => {
            this.setState({error: null});
        }

        render(props){
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    backdropClicked={this.errorConfirmedhandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
        
    }
}

export default withErrorHandler;