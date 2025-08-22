import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
    try {
        const { pathname } = new URL(req.url);
        const id = pathname.split("/").pop(); // get last segment as ID

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("myDatabase");

        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

        if (!product) {
            return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }

        // Convert _id to string
        const serialized = { ...product, _id: product._id.toString() };

        return new Response(JSON.stringify(serialized), { status: 200 });
    } catch (err) {
        console.error("Failed to fetch product:", err);
        return new Response(
            JSON.stringify({ message: "Failed to fetch product" }),
            { status: 500 }
        );
    }
}
