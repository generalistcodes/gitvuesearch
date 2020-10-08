import 'jest';
import { mount, shallowMount } from '@vue/test-utils';
import GitSearch from '@/components/GitSearch.vue';  

describe('InputSearch', () => {

    test("Pass query value to the input", () =>{
        const query = 'Angular';
        const wrapper = shallowMount(GitSearch, {
          propsData: { query },
        });
        expect(wrapper.text()).toMatch(query);
        expect(wrapper.html()).toMatchSnapshot()
    })

    
    // test("Pass query value to the input", () =>{
    //     const wrapper = mount(GitSearch, {
    //         propsData: {
    //             query: 'angular'
    //         }
    //     })
    //     expect(wrapper.html()).toMatchSnapshot()
    // })
});