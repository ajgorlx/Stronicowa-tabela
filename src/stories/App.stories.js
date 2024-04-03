import App from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';


export default {
    title: 'Components/App',
    component: App,
}

const Template = (args) => <App {...args} />;


export const Default = Template.bind({});
