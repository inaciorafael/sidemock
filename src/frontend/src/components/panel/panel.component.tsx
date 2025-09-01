import React from 'react';

import type { PanelProps } from './panel.model.ts'
import './panel.styles.css';

const httpMethods = [
  { method: "GET", color: "text-green-500" },
  { method: "POST", color: "text-blue-500" },
  { method: "PUT", color: "text-yellow-500" },
  { method: "PATCH", color: "text-purple-500" },
  { method: "DELETE", color: "text-red-500" },
];

const Panel: React.FC<PanelProps> = ({}) => {
  return (
    <div className="grid overflow-hidden h-[var(--content-height)]">
      <div className='flex flex-row col-span-12'>

        <div className="">
          <label
            htmlFor="http-method"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            HTTP Method
          </label>
          <select
            id="http-method"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {httpMethods.map(({ method, color }) => (
              <option key={method} value={method} className={color}>
                {method}
              </option>
            ))}
          </select>
      </div>

        <input placeholder="endpoint" />
      </div>
      <h1>panel works!</h1>
    </div>
  );
};

export default Panel;
