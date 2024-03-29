import Pagination from "../components/Pagination";

export default {
    title: 'Components/Pagination',
    component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
    tagsPerPage: 10,
    totalTags: 100,
    currentPage: 1,
};

export const LargeNumberOfPages = Template.bind({});
LargeNumberOfPages.args = {
    tagsPerPage: 10,
    totalTags: 1000,
    currentPage: 1,
};

export const LastPage = Template.bind({});
LastPage.args = {
    tagsPerPage: 10,
    totalTags: 100,
    currentPage: 10,
}