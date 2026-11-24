import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  filterProjects,
  isPdfResponseAvailable,
  isValidExternalUrl,
  validateContactForm,
} from './portfolioLogic';
import { COMPLETED_PROJECTS } from '../data/portfolioData';

test('isValidExternalUrl rejects empty, hash, and placeholder strings', () => {
  assert.equal(isValidExternalUrl(''), false);
  assert.equal(isValidExternalUrl('   '), false);
  assert.equal(isValidExternalUrl('#'), false);
  assert.equal(isValidExternalUrl('PLACEHOLDER_GITHUB'), false);
  assert.equal(isValidExternalUrl('javascript:alert(1)'), false);
  assert.equal(isValidExternalUrl('https://github.com/example/repo'), true);
});

test('filterProjects returns all 5 completed projects for All and filters accurately by category', () => {
  const all = filterProjects(COMPLETED_PROJECTS, 'All');
  assert.equal(all.length, 5);

  const automation = filterProjects(COMPLETED_PROJECTS, 'Workflow Automation');
  assert.equal(automation.length, 3);
  assert.ok(automation.every((p) => p.category === 'Workflow Automation'));

  const aiSystems = filterProjects(COMPLETED_PROJECTS, 'AI Systems');
  assert.equal(aiSystems.length, 1);
  assert.equal(aiSystems[0].id, 'radius-ai');

  const localLlms = filterProjects(COMPLETED_PROJECTS, 'Local LLMs');
  assert.equal(localLlms.length, 1);
  assert.equal(localLlms[0].id, 'local-ai-ollama');
});

test('validateContactForm rejects empty or invalid fields and accepts valid input', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Recruiter Name',
    email: 'recruiter@company.com',
    subject: 'AI Automation Opportunity',
    message: 'We would like to discuss an automation engineering role.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildMailtoHref encodes subject and message safely', () => {
  const href = buildMailtoHref('polashmy3@gmail.com', {
    name: 'Tariq',
    email: 'tariq@example.com',
    subject: 'Project Inquiry & Scope',
    message: 'Hello Shakhawat, let us connect.',
  });
  assert.ok(href.startsWith('mailto:polashmy3@gmail.com?subject='));
  assert.ok(href.includes('Project%20Inquiry%20%26%20Scope'));
  assert.ok(href.includes('tariq%40example.com'));
});

test('isPdfResponseAvailable catches SPA HTML fallback and verifies application/pdf', () => {
  assert.equal(isPdfResponseAvailable(200, 'text/html; charset=utf-8'), false);
  assert.equal(isPdfResponseAvailable(404, 'application/pdf'), false);
  assert.equal(isPdfResponseAvailable(200, null), false);
  assert.equal(isPdfResponseAvailable(200, 'application/pdf'), true);
});
