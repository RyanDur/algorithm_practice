require 'spec_helper'

describe Heap_Sort do

  describe 'sort' do
    it 'should return the sorted array' do
      subject.sort([9,8,7,6,5,4,3,2,1,0]).should eq [0,1,2,3,4,5,6,7,8,9]

      subject.sort([34,234,15,67,2]).should eq [2,15,34,67,234]

      subject.sort([4,3,5,2,6,1]).should eq [1,2,3,4,5,6]
    end
  end
end
