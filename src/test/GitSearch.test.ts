import 'jest';
import { mount, shallowMount } from '@vue/test-utils';
import GitSearch from '@/components/GitSearch.vue';  

describe('InputSearch', () => {

    test('Testing Method', () => {
       
        const wrapper = mount(GitSearch)
        expect(wrapper.vm.testthis).toBeTruthy()

        console.log("how:", wrapper.vm.testthis)
        
      })

    test('returns query result', ()=>{
        const wrapper = mount(GitSearch)
        expect(wrapper.vm.getRepositoryItems).toBeTruthy()
    })


});

