require 'spec_helper'

describe 'Priority_Queue' do

  describe 'enqueue' do
    it 'should sort input values based on there priority' do
      pq = Priority_Queue.new 10

      pq.enqueue 10
      pq.front.should eq 10

      pq.enqueue 9
      pq.front.should eq 9
      pq.rear.should eq 10
    end
  end
end
