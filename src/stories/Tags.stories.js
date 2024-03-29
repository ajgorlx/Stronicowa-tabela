import Tags from '../components/Tags'
import { action } from '@storybook/addon-actions'


export default {
    title: 'Components/Tags',
    component: Tags,
    argTypes: {
        handlePerPageChange: {action: 'handlePerPageChange'},
        handleSort: {action: 'handleSort'},
    }
}

const Template = (args) => <Tags {...args} />;


export const Default = Template.bind({});
Default.args = {
tags:[{ name: 'react', count: 100}, {name:'javascript', count: 200}],
loading: false,
tagsPerPage: 10,
handlePerPageChange: action('handlePerPageChange'),
handleSort: action('handleSort'),
sortBy: "count",
sortDirection: "asc",
}
