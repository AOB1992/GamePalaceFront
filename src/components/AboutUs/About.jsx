import React from "react";
import Styles from './About.module.css'



export default function About() {

    return (
        <section className={Styles.aboutus}>
            <div className={Styles.container}>
            <h2>Nosotros</h2>
            <p>Bienvenido a nuestro ecommerce de hardware, donde nos apasiona proveer a nuestros clientes con los mejores productos y servicios en el mercado de la tecnología. Desde su fundación en 2023, nuestra empresa se ha enfocado en ofrecer productos innovadores y de alta calidad para satisfacer las necesidades de nuestros clientes, que incluyen desde aficionados a la tecnología hasta empresas de diversos sectores.

            En nuestra tienda en línea, encontrarás una amplia selección de productos de hardware, que van desde componentes para computadoras, periféricos, gadgets y accesorios, hasta dispositivos electrónicos móviles y de redes. Todos nuestros productos han sido cuidadosamente seleccionados por nuestro equipo de expertos, quienes se aseguran de que cumplan con los estándares más altos de calidad, rendimiento y fiabilidad.

            Pero nuestra empresa no sólo se enfoca en vender productos de hardware de alta calidad. También nos importa brindar una experiencia de compra excepcional a nuestros clientes. Es por ello que ofrecemos un servicio de atención al cliente excepcional, entregas rápidas y confiables, y precios competitivos. Nuestro objetivo es que cada cliente se sienta satisfecho con su compra y regrese a nuestra tienda en línea para futuras compras.

            En resumen, en nuestro ecommerce de hardware, no sólo encontrarás los mejores productos de tecnología en el mercado, sino también un servicio al cliente excepcional que superará tus expectativas. ¡Gracias por elegirnos como tu proveedor de tecnología de confianza!</p>
            </div>
        </section>
        
    );
};
