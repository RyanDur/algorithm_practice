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

    its :front do
      inserts 2, 3, 4

      should eq 4
    end

    its :front do
      inserts 4, 2, 6, 34, 7, 89, 5

      should eq 89
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
      subject.delete_front

      should eq 3
    end

    its :front do
      inserts 4, 2, 6, 34, 7, 89, 5
      subject.delete_front

      should eq 34
    end
  end

  def inserts *args
    args.each do |arg|
      subject.insert arg
    end
  end
end
