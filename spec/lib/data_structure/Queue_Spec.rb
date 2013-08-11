require 'spec_helper'

describe 'Queue' do

  describe 'enqueue' do
    it 'should put the value at the end of the collection' do
      queue = Queue.new 10

      queue.enqueue 3
      queue.rear.should eq 3

      queue.enqueue 5
      queue.rear.should eq 5
    end

    it 'should raise an error if the queue is full' do
      queue = Queue.new 1
      queue.enqueue 1

      expect{queue.enqueue 2}.to raise_error "Queue is full"
      queue.rear.should eq 1
    end
  end

  describe 'dequeue' do
    it 'should remove from the front of the collection' do
      queue = Queue.new 10

      queue.enqueue 3
      queue.enqueue 10
      queue.enqueue 11
      queue.enqueue 2

      queue.front.should eq 3
      queue.dequeue
      queue.front.should eq 10
      queue.dequeue
      queue.front.should eq 11
      queue.dequeue
      queue.front.should eq 2
    end

    it 'should raise an error if dequeuing an empty queue' do
      queue = Queue.new 0
      expect{queue.dequeue}.to raise_error 'Queue is empty'

      queue = Queue.new 10
      expect{queue.dequeue}.to raise_error 'Queue is empty'

      queue = Queue.new 3
      queue.enqueue 1
      queue.enqueue 1
      queue.enqueue 1
      queue.dequeue
      queue.dequeue
      queue.dequeue
      expect{queue.dequeue}.to raise_error 'Queue is empty'
    end
  end
end
