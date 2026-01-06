import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, projectType } = body;

    // In a real application, you would add your email sending logic here.
    // For example, using a service like Resend, SendGrid, or Nodemailer.
    console.log('Received contact form submission:');
    console.log('Name:', name);
    console.log('Company:', company);
    console.log('Email:', email);
    console.log('Project Type:', projectType);

    // Simulate a successful response
    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'There was an error processing your request.' }, { status: 500 });
  }
}
