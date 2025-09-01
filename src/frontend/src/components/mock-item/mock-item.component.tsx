import React from 'react';

import type { MockItemProps } from './mock-item.types.ts'
import './mock-item.styles.css';
import type { Mock } from '../../services/mocks/mocks.schema.ts';

const httpMethodColors: Record<Mock['method'], string> = {
  GET: "text-green-600",
  POST: "text-blue-600",
  PUT: "text-yellow-600",
  PATCH: "text-orange-600",
  DELETE: "text-red-600",
}

const MockItem: React.FC<MockItemProps> = ({ method, url }) => {
  return (
    <button className="hover:bg-gray-100 transition-all flex flex-row items-center gap-2 text-sm rounded px-3 py-1">
      <div>
        <span className={`${httpMethodColors[method]} font-semibold`}>{method}</span>
      </div>
      <span className='line-clamp-1 text-start'>{url}</span>
    </button>
  );
};

export default MockItem;
