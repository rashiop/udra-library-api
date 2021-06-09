import { ActiveStatus, getActiveStatus } from '..';

describe('Helper Functions', () => {
  describe('Get active status', () => {
    it(`When ActiveStatus is ${ActiveStatus.D} return ${ActiveStatus.D}`, () => {
      expect(getActiveStatus(ActiveStatus.D)).toBe(ActiveStatus.D);
      expect(getActiveStatus(ActiveStatus.D)).not.toBe(ActiveStatus.A);
    });

    it(`When ActiveStatus is not ${ActiveStatus.D} return ${ActiveStatus.A}`, () => {
      expect(getActiveStatus()).toBe(ActiveStatus.A);
      expect(getActiveStatus(ActiveStatus.A)).toBe(ActiveStatus.A);
      expect(getActiveStatus(ActiveStatus.D)).not.toBe(ActiveStatus.A);
    });
  });
});
