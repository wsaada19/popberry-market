import { LinkType } from '@types';
import React from 'react';
import Link from 'next/link';
import { BreadcrumbsLd } from '../schema/SchemaComponents';

export type BreadcrumbsProps = {
  crumbs: LinkType[];
};

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <>
      <BreadcrumbsLd crumbs={crumbs} />
      <div className="mb-4">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.label}>
              <Link
                href={crumb.href}
                passHref
                className={`${
                  isLast
                    ? 'text-gray-400 cursor-default pointer-events-none dark:text-gray-400'
                    : ''
                }`}
              >
                <span className="hover:underline">{crumb.label}</span>
              </Link>
              <span className="text-gray-400 mx-1">{isLast ? '' : ' / '}</span>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
