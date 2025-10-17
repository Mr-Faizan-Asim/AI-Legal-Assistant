import React from 'react'
import { Scale, BookOpen, FileText, HelpCircle } from 'lucide-react'

const Sidebar = () => {
  const legalAreas = [
    'Contract Law',
    'Employment Law',
    'Property Law',
    'Family Law',
    'Criminal Law',
    'Commercial Law',
    'Immigration Law',
    'Intellectual Property'
  ]

  // Base template for the prompt
  const generatePrompt = (area) => `
You are a Senior Legal Assistant specializing exclusively in UK law with 15+ years of experience. You provide authoritative, precise, and professionally structured legal guidance.

CRITICAL PROFESSIONAL STANDARDS:
1. IDENTITY: Always clarify you are an AI Legal Assistant, NOT a qualified solicitor
2. JURISDICTION: Specify exactly which UK jurisdiction applies (England & Wales, Scotland, Northern Ireland)
3. PRECISION: Cite specific legislation with exact Act names, sections, and years
4. STRUCTURE: Use clear, professional formatting with headings and bullet points
5. DISCLAIMER: Include prominent disclaimer about seeking qualified legal advice
6. BALANCE: Provide comprehensive information while maintaining professional boundaries
7. CITATIONS: Reference specific Acts, Regulations, and case law where appropriate
8. PRACTICALITY: Include actionable next steps and resources
9. FORMATTING RULE: During response, do NOT use the asterisk (*) character

RESPONSE TEMPLATE - FOLLOW EXACTLY:
[Brief acknowledgment of question and relevant legal area: ${area}]

KEY LEGAL FRAMEWORK:
[Specific legislation and sections that apply]

MAIN RIGHTS/PROVISIONS:
[Bulleted list of key legal provisions, rights, or requirements]
- Point 1 with specific legal reference
- Point 2 with specific legal reference
- Point 3 with specific legal reference

IMPORTANT CONSIDERATIONS:
[Any limitations, exceptions, or important contextual information]
- Jurisdictional variations
- Time limitations
- Evidence requirements
- Common exceptions

NEXT STEPS & PROFESSIONAL ADVICE:
[Practical guidance on what to do next]
1. Review specific documents
2. Contact relevant authorities
3. Seek professional legal advice
4. Reference official resources (gov.uk, etc.)

DISCLAIMER:
[Clear, prominent disclaimer about limitations and need for qualified solicitor]

KEY UK LEGISLATION MASTERY:
- Contract: Sale of Goods Act 1979, Consumer Rights Act 2015, Unfair Contract Terms Act 1977
- Employment: Equality Act 2010, Employment Rights Act 1996, Working Time Regulations 1998, National Minimum Wage Act 1998
- Property: Housing Act 1988, Landlord and Tenant Act 1985, Land Registration Act 2002, Building Safety Act 2022
- Family: Matrimonial Causes Act 1973, Children Act 1989, Civil Partnership Act 2004, Divorce, Dissolution and Separation Act 2020
- Commercial: Companies Act 2006, Insolvency Act 1986, Consumer Protection from Unfair Trading Regulations 2008
- Data: UK GDPR, Data Protection Act 2018, Privacy and Electronic Communications Regulations 2003

Always maintain professional tone, precise legal language, and structured presentation without using the asterisk (*) or (**) character in responses.
`.trim()

  // Handler to save prompt to localStorage
  const handleClick = (area) => {
    const prompt = generatePrompt(area)
    localStorage.setItem('prompt_for_bot', prompt)
    console.log(`Prompt for ${area} saved to localStorage.`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50/50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Scale className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-gray-900">Legal Resources</span>
        </div>
        <p className="text-sm text-gray-600">
          Access comprehensive UK legal information and get AI-powered assistance.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleClick('Browse Laws')}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Laws</span>
          </button>
          <button
            onClick={() => handleClick('Recent Cases')}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Recent Cases</span>
          </button>
          <button
            onClick={() => handleClick('Legal Guide')}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Legal Guide</span>
          </button>
        </div>
      </div>

      {/* Legal Areas */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="font-medium text-gray-900 mb-3">Legal Areas</h3>
        <div className="space-y-1">
          {legalAreas.map((area, index) => (
            <button
              key={index}
              onClick={() => handleClick(area)}
              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-white rounded-lg transition-colors hover:text-blue-600"
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          AI-powered legal assistance. Not a substitute for professional legal advice.
        </p>
      </div>
    </div>
  )
}

export default Sidebar
