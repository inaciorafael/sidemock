import React, { useEffect, useState } from 'react';

import type { MocksProps } from './mocks.types.ts'
import { useTabs } from '../../hooks'
import { MockItem } from '../../components'
import { mocksService } from '../../services'
import './mocks.styles.css';
import type { Mock } from '../../services/mocks/mocks.schema.ts';

const Mocks: React.FC<MocksProps> = ({ tabGroupId }) => {
  const [mocks, setMocks] = useState<Mock[]>([])
  const { id } = useTabs(tabGroupId)

  const getMocks = async (): Promise<void> => {
    const response = await mocksService.list()

    if (response.ok) {
      setMocks(response.data ?? []);
      return
    }
  }

  useEffect(() => {
    getMocks()
  }, [])

  return (
    <div className="mocks-container">
      <div className='flex flex-col gap-2'>
        {mocks.map((mock) => (
          <MockItem key={mock.id} {...mock} />
        ))}
      </div>
    </div>
  );
};

export default Mocks;
