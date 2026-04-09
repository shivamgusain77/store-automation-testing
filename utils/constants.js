export const boswserErrorMessage = 'Please fill out this field.';
export const invalidEmails = [
  {
    value: 'automationgmail.com',
    expected: "include an '@'",
  },
  {
    value: 'automation@@gmail.com',
    expected: 'not contain',
  },
  {
    value: 'automation@',
    expected: 'incomplete',
  },
];
