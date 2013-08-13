require 'spec_helper'

describe Heap do

  describe 'when inserting' do
    its :front do
      subject.insert 5

      should eq 5
    end

    its :front do
      subject.insert 10

      should eq 10
    end

    its :front do
      inserts 2, 5, 10

      should eq 10
    end
  end

  describe 'when deleting' do
    its :front do
      inserts 5, 10
      subject.delete_front

      should eq 5
    end

    its :front do
      inserts 2, 5, 10
      subject.delete_front

      should eq 5
    end

    its :front do
      inserts 2, 10, 5, 15
      subject.delete_front

      should eq 10
    end

    its :front do
      inserts 2, 3, 4

      should eq 4
    end
  end

  def inserts *args
    args.each do |arg|
      subject.insert arg
    end
  end
end
