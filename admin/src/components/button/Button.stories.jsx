import Button from './Button'

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        label: {
            type: 'string',
            description: 'Контент кнопки',
            defaultValue: 'Click me',
        },
    },
}
const Template = (arg) => <Button {...arg} />
export const Default = Template.bind({})
Default.args = {
    color: 'gray',
    padding: '5px',
}
export const Large = Template.bind({})
Large.args = {
    color: 'rgba(0,0,0,0.1)',
}
