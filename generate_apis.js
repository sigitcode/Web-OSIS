const fs = require('fs');
const path = require('path');

const entities = [
  { name: 'banners', schemaVar: 'banners' },
  { name: 'pengumuman', schemaVar: 'pengumuman' },
  { name: 'jabatan', schemaVar: 'jabatan' },
  { name: 'divisi', schemaVar: 'divisi' },
  { name: 'anggota-osis', schemaVar: 'pengurus_osis' }
];

entities.forEach(({ name, schemaVar }) => {
  const dirPath = path.join(__dirname, 'src', 'app', 'api', name);
  const idDirPath = path.join(dirPath, '[id]');
  
  fs.mkdirSync(idDirPath, { recursive: true });

  const routeContent = `import { db } from "@/db";
import { ${schemaVar} } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(${schemaVar});
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await db.insert(${schemaVar}).values(body).returning();
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
`;

  const idRouteContent = `import { db } from "@/db";
import { ${schemaVar} } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await db.select().from(${schemaVar}).where(eq(${schemaVar}.id, parseInt(id)));
    if (!data.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = await db.update(${schemaVar}).set(body).where(eq(${schemaVar}.id, parseInt(id))).returning();
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(${schemaVar}).where(eq(${schemaVar}.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
`;

  fs.writeFileSync(path.join(dirPath, 'route.ts'), routeContent);
  fs.writeFileSync(path.join(idDirPath, 'route.ts'), idRouteContent);
  console.log('Created API for', name);
});
