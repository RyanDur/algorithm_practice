require 'spec_helper'

describe 'Selection_Sort' do

  describe 'sort' do
    it 'should sort the collection from small to large' do
      ss = Selection_Sort.new
      container = My_Container.new [9,8,7,6,5,4,3,2,1]
      sorted_container = My_Container.new [1,2,3,4,5,6,7,8,9]

      ss.sort container
      container.equal(sorted_container).should be_true


      container = My_Container.new [4,6,2,8,1,9]
      sorted_container = My_Container.new [1,2,4,6,8,9]

      ss.sort container
      container.equal(sorted_container).should be_true


      container = My_Container.new [9]
      sorted_container = My_Container.new [9]

      ss.sort container
      container.equal(sorted_container).should be_true
    end
  end
end
