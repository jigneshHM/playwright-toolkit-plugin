import { test, expect } from '../fixtures';
import { coupons, users } from '../test-data';

test.describe('US-101 coupon rules (API)', () => {
  test('US-101 AC3: FLAT100 at exactly ₹500 gives ₹100 off', async ({ api }) => {
    const { status, body } = await api.validateCoupon(coupons.flat, 500, users.standard.email);
    expect(status).toBe(200);
    expect(body.discount).toBe(100);
  });

  test('US-101 AC3: FLAT100 below ₹500 is not applied', async ({ api }) => {
    const { status } = await api.validateCoupon(coupons.flat, 499, users.standard.email);
    expect(status).toBeGreaterThanOrEqual(400);
  });

  test('US-101 AC1: codes are case-insensitive and trimmed', async ({ api }) => {
    const { status, body } = await api.validateCoupon(' flat100 ', 500, users.standard.email);
    expect(status).toBe(200);
    expect(body.discount).toBe(100);
  });

  test('US-101 AC5: SUMMER25 is expired', async ({ api }) => {
    const { status, body } = await api.validateCoupon(coupons.expired, 1000, users.standard.email);
    expect(status).toBeGreaterThanOrEqual(400);
    expect(JSON.stringify(body)).toContain('This coupon has expired');
  });
});
