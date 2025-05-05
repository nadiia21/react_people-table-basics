import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type PersonProps = {
  person: Person;
  hasInTable: (name: string) => Person | undefined;
};

export const PersonLink: React.FC<PersonProps> = ({ person, hasInTable }) => {
  const { name, sex, born, died, slug, fatherName, motherName } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName === null ? (
          '-'
        ) : hasInTable(motherName) ? (
          <a
            className={classNames({
              'has-text-danger': hasInTable(motherName),
            })}
            href={`#/people/${hasInTable(motherName)?.slug}`}
          >
            {motherName}
          </a>
        ) : (
          `${motherName}`
        )}
      </td>
      <td>
        {fatherName === null ? (
          '-'
        ) : hasInTable(fatherName) ? (
          <a href={`#/people/${hasInTable(fatherName)?.slug}`}>{fatherName}</a>
        ) : (
          `${fatherName}`
        )}
      </td>
    </tr>
  );
};
