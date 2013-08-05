require 'spec_helper'

describe 'Insertion Sort' do

  describe 'sort' do
    it 'should sort the collection from small to large' do
      is = Insertion_sort.new
      container = My_Container.new [9,8,7,6,5,4,3,2,1]
      sorted_container = My_Container.new [1,2,3,4,5,6,7,8,9]

      is.sort container
      container.equal(sorted_container).should be_true


      container = My_Container.new [5,7,2,9,6,1,1]
      sorted_container = My_Container.new [1,1,2,5,6,7,9]

      is.sort container
      container.equal(sorted_container).should be_true


      container = My_Container.new [98]
      sorted_container = My_Container.new [98]

      is.sort container
      container.equal(sorted_container).should be_true
    end
  end
end
