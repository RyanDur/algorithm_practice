require 'spec_helper'

describe 'Merge Sort' do

  describe 'sort' do
    it 'should sort a collection' do
      ms = Merge_Sort.new
      collection = [9,8,7,6,5,4,3,2,1,0]
      sorted_collection = [0,1,2,3,4,5,6,7,8,9]

      ms.sort(collection).should eq sorted_collection

      collection = [7,9,2,3,1,0,4,5,6,8]
      sorted_collection = [0,1,2,3,4,5,6,7,8,9]

      ms.sort(collection).should eq sorted_collection

      collection = [9,8]
      sorted_collection = [8,9]

      ms.sort(collection).should eq sorted_collection

      collection = [0]
      sorted_collection = [0]

      ms.sort(collection).should eq sorted_collection
    end
  end
end
