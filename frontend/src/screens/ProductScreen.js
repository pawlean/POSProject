import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = () => {
	const match = useParams();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${match.id}`);
			setProduct(data);
		};

		fetchProduct();
	}, [match]);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Regresar
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid></Image>
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h3>{product.name}</h3>
						</ListGroupItem>
						<ListGroupItem>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroupItem>
						<ListGroupItem>Precio: ${product.price}</ListGroupItem>
						<ListGroupItem>Descripción: ${product.description}</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={3}>
					{/* This can be converted into a component */}
					<Card>
						<ListGroup variant="flush">
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Status</Col>
									<Col>
										{product.countInStock > 0 ? "Con stock" : "Sin stock"}
									</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem className="d-grid gap-0">
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Agregar al carrito
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
