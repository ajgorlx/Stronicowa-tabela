import App from '../App';


export default {
    title: 'Components/App',
    component: App,
    args: {
        error: true
    }
}

const Template = (args) => <App {...args} />;


export const error = Template.bind({});
