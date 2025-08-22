import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("myDatabase"); // change if needed

        const products = await db.collection("products").find({}).toArray();

        // Convert ObjectId to string for frontend
        const serialized = products.map((p) => ({
            ...p,
            _id: p._id.toString(),
        }));

        return new Response(JSON.stringify(serialized), { status: 200 });
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return new Response(
            JSON.stringify({ message: "Failed to fetch products" }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db("myDatabase");

        const newProduct = {
            ...body,
            createdAt: new Date(),
        };

        const result = await db.collection("products").insertOne(newProduct);

        return new Response(
            JSON.stringify({ message: "Product added", id: result.insertedId.toString() }),
            { status: 201 }
        );
    } catch (err) {
        console.error("Failed to add product:", err);
        return new Response(
            JSON.stringify({ message: "Failed to add product" }),
            { status: 500 }
        );
    }
}
