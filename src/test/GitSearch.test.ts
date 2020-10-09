import 'jest';
import { mount, shallowMount } from '@vue/test-utils';
import GitDisplay from '@/components/GitDisplay.vue';  

describe('InputSearch', () => {

    test('returns query result', ()=>{
        const wrapper = mount(GitDisplay)
        // expect(wrapper.vm.getRepositoryItems).toBeTruthy()
    })


});

