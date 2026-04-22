# First-Class Consumers

## Purpose

This document defines the public-consumption surfaces that the repository must serve from one canonical source of truth.

The site does not have a single public consumer. It has multiple public consumers with different acquisition conditions and different needs.

## Public Consumers

### 1. Human interactive website

The human consumer receives:

- guided navigation
- visual hierarchy
- pacing
- interaction
- deliberate UX
- progressive disclosure where appropriate

The human surface is allowed to organize, stage, and pace information through interface structure.

### 2. Agent acquisition surface

The agent consumer receives:

- direct acquisition
- explicit labels
- stable types and categories
- low ambiguity
- minimal interaction cost
- coherent one-pass retrieval where possible

Agentic AI is a first-class public consumer.

Machine-readability is not an afterthought. It is a required property of the public site.

A public fact should not require an agent to imitate a human browsing pattern in order to acquire it.

### 3. PDF / print artifacts

The print consumer receives:

- fixed-layout portable output
- preserved public content in downloadable form
- a stable export projection of the same public truth

PDF and print are output formats, not separate authored truth domains.

## Governing Rule

One canonical truth source must project into:

- human interactive website
- agent acquisition surface
- PDF / print artifacts

These are different projections of the same truth, not separate content authorities.

## Retrieval Rule

Hidden-by-UX is acceptable.

Hidden-from-retrieval is not acceptable.

This means:

- a human may encounter information progressively
- an agent must still be able to recover intentionally public information from a coherent labeled structure
- interaction may guide the human experience
- interaction must not be the sole acquisition path for public truth

## Why This Matters

### Hiring and representation

A hiring-facing public site must remain recoverable both by human reviewers and by automated or agentic systems that acquire public facts from URLs and structured surfaces.

### Preservation

A canonical truth source reduces drift and keeps the public record stable across changing interfaces and outputs.

### Future templating and reuse

If the site later expands into reusable templates, alternate frontends, or new export forms, a first-class consumer model prevents the content layer from being locked to one interface.
