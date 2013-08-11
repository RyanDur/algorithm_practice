require 'spec_helper'

describe 'Bubble_Sort' do

  describe 'sort' do
    it 'should sort the collection from small to large' do
      bs = Bubble_Sort.new
      container = My_Container.new [8, 5, 1, 4, 2]
      sorted_container = My_Container.new [1, 2, 4, 5, 8]
      bs.sort(container)
      container.equal(sorted_container).should be_true

      container = My_Container.new [7,3]
      sorted_container = My_Container.new [3,7]
      bs.sort(container)
      container.equal(sorted_container).should be_true

      container = My_Container.new [79]
      sorted_container = My_Container.new [79]
      bs.sort(container)
      container.equal(sorted_container).should be_true
    end
  end
end
