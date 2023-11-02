/* eslint-disable @typescript-eslint/no-explicit-any */
// TagList.js (Custom Reusable Component)
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

function TagsContainer({ tags, onDeleteTag }: any) {
  return (
    <div className="flex gap-x-2 mt-1 overflow-x-auto overflow-y-hidden py-2">
      {tags.map((tag: any, index: any) => (
        <div
          className="tag rounded-lg px-3 text-sm bg-green-500/30 text-green-900 flex items-center gap-x-1"
          key={index}
        >
          {tag.tag}
          <button className="remove-tag" onClick={() => onDeleteTag(tag._id)}>
            <RxCross2 className="text-green-600" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TagsContainer;
