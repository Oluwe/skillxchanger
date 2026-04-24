---
name: add-feature
description: Scaffold new features like messaging between users or skill matching algorithms.
parameters:
  - name: feature
    description: Description of the feature to implement
    required: true
---

# Add Feature

Implement the following feature: {{feature}}

## Planning

1. **Requirements Analysis**:
   - Define the feature scope and user stories
   - Identify required components, API endpoints, and database changes

2. **Architecture Design**:
   - Plan the data models and relationships
   - Design the UI/UX flow
   - Define API contracts

3. **Implementation Steps**:
   - Create necessary database schemas/migrations
   - Implement API routes with proper validation
   - Build React components with state management
   - Add routing and navigation
   - Implement error handling and loading states

4. **Testing**:
   - Unit tests for components and API
   - Integration tests for user flows
   - Manual testing for UX

## Code Structure

Provide complete, runnable code for:

- Database schema changes
- API route implementations
- React components
- Integration with existing codebase

Ensure the implementation follows the project's conventions (Next.js App Router, Tailwind CSS, NextAuth, etc.) and includes proper error handling and validation.
